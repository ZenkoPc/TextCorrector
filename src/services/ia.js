const COHERE_API_KEY = import.meta.env.PUBLIC_COHERE_API_KEY
const COHERE_API_URL = 'https://api.cohere.ai/generate'
const COHERE_API_LANGUAGE_URL = 'https://api.cohere.ai/detect-language'

export async function chechLanguage(input){
    const data = {
        texts: [input]
    }

    const response = await fetch(COHERE_API_LANGUAGE_URL,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `BEARER ${COHERE_API_KEY}`,
            "Content-Type": 'application/json',
            "Cohere-Version": '2022-12-06'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())

    const res = response.results[0].language_name === 'English'
    
    return res
}

export async function fixMyEnglish(input){

    const data = {
        mode: 'xlarge',
        prompt: `This is a spell checker generator.
            --
                Incorrect sample: "I are good!"
                Correct sample: "I am good!"
            --
                Incorrect sample: "I have 22 years old"
                Correct sample: "I am 22 years old"
            --
                Incorrect sample: "I don't can know"
                Correct sample: "I don't know"
            --
                Incorrect sample: "${input}"
                Correct sample:`,
        max_tokens: 40,
        temperature: 0.3,
        k: 0,
        p: 1,
        frequency_penalty: 0,
        stop_sequences:['--'],
        return_likelihoods: 'NONE'
    }

    const response = await fetch(COHERE_API_URL,{
        method: 'POST',
        headers: {
            Authorization: `BEARER ${COHERE_API_KEY}`,
            "Content-Type": 'application/json',
            "Cohere-Version": '2022-12-06'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())

    return response.generations[0].text.split('"')[1]
}
