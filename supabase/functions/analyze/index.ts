const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface FormData {
  basicInfo: {
    childName: string;
    dateOfBirth: string;
    parentName: string;
    contactInfo: {
      address: string;
      phone: string;
      email: string;
    };
  };
  vaccination: {
    currentVaccines: string[];
    details: string;
  };
  previousReactions: {
    hadReactions: boolean;
    types: string[];
    details: string;
    vaccines: string;
    documented: boolean;
  };
  healthStatus: {
    conditions: string[];
    otherConditions: string;
    allergies: string[];
    otherAllergies: string;
    medications: string;
  };
  familyHistory: {
    conditions: string[];
    details: string;
    extendedFamily: boolean;
  };
  concerns: {
    ingredients: string[];
    otherIngredients: string;
    reasons: string[];
    otherReasons: string;
    religiousBeliefs: string;
  };
  documentation: {
    hasDocuments: boolean;
    descriptions: string;
  };
}

async function callGeminiAPI(data: any, retryCount = 0): Promise<Response> {
  const apiKey = 'AIzaSyC5XXYlmDUITnuHvel4xW3tnFsAK1RKdUk';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${apiKey}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API hiba (${response.status}):`, errorText);

      if (response.status === 502 && retryCount < 3) {
        const delay = Math.pow(2, retryCount) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        return callGeminiAPI(data, retryCount + 1);
      }

      throw new Error(`API hiba: ${response.status} - ${errorText}`);
    }

    return response;
  } catch (error) {
    console.error('Hiba a Gemini API hívásakor:', error);
    throw error;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== 'POST') {
      throw new Error('Nem megengedett HTTP metódus');
    }

    const formData = await req.json();
    
    if (!formData || typeof formData !== 'object') {
      throw new Error('Érvénytelen bemeneti adatok');
    }

    const magyarFormData = {
      ...formData,
      previousReactions: {
        ...formData.previousReactions,
        hadReactions: formData.previousReactions.hadReactions ? "volt_reakcio" : "nem_volt_reakcio"
      }
    };

    const prompt = `
      A következő adatok alapján készíts egy hivatalos, magyar nyelvű kérelmet az oltóorvos részére az oltási mentesség igényléséhez. A levél legyen formális, szakmai és részletes, de közérthető. Használd fel az összes releváns információt a kérelemben, különös tekintettel az egészségügyi állapotra, családi kórtörténetre és az esetleges korábbi reakciókra.

      FONTOS: Ne használj markdown formázást vagy egyéb speciális karaktereket! Csak sima szöveget generálj!

      A levél szerkezete:

      1. Hivatalos megszólítás
      2. Bevezető a gyermek és szülő(k) adataival
      3. A kérelem tárgya és jogszabályi hivatkozások
      4. Részletes indoklás az alábbi sorrendben:
         - Családi kórtörténet és genetikai hajlamok
         - A gyermek egyéni egészségi állapota
         - Korábbi oltási reakciók (ha voltak)
         - Az aktuális oltással kapcsolatos konkrét aggályok
      5. A kérelem megismétlése
      6. Keltezés és aláírás helye

      A válasz legyen bekezdésekre tagolt, könnyen olvasható. Kerüld a placeholder szövegeket, csak a megadott adatokból építkezz.

      Adatok: ${JSON.stringify(magyarFormData)}
    `;

    const generationConfig = {
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 2048,
    };

    const data = {
      generationConfig,
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
          ],
        },
      ],
    };

    const response = await callGeminiAPI(data);
    const result = await response.json();

    if (!result.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Érvénytelen válasz formátum');
    }

    return new Response(
      JSON.stringify(result),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Hiba történt:', error);
    
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Ismeretlen hiba történt',
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: error instanceof Error && error.message.includes('API kulcs') ? 500 : 400,
      }
    );
  }
});