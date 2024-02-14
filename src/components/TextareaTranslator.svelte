<script>
    import { isValidInput } from '../services/store'
    import { chechLanguage } from '../services/ia'
    import { get } from 'svelte/store';
    import debounce from 'just-debounce-it'

    const handleChange = debounce(async (e) => {
        const { value } = e.target
        const isValid = value.length > 0
        if(!isValid) { 
            isValidInput.set(false)
            return
        }
        const isEnglish = await chechLanguage(value)
        isValidInput.set(isEnglish)
        console.log(get(isValidInput))
    }, 500)
</script>

<textarea on:input={handleChange} 
    placeholder="" 
    id="messageTranslator" 
    rows="4" 
    class={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 }`}>    
</textarea>