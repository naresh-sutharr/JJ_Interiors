import { useEffect } from 'react';

export const useSchema = (schemaData: object | object[]) => {
  useEffect(() => {
    // 1. Create a script element for JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    // 2. Stringify the schema data
    // We add a unique ID to easily identify and clean up our dynamic schemas
    script.id = 'dynamic-json-ld';
    script.text = JSON.stringify(schemaData);
    
    // 3. Clean up any existing dynamic schemas before appending
    const existingScript = document.getElementById('dynamic-json-ld');
    if (existingScript) {
      existingScript.remove();
    }
    
    // 4. Append to head
    document.head.appendChild(script);
    
    // 5. Cleanup on unmount
    return () => {
      const el = document.getElementById('dynamic-json-ld');
      if (el) {
        el.remove();
      }
    };
  }, [schemaData]);
};
