// this is the shell command that gets executed every time this widget refreshes
export const command = `curl -s -H "Accept: text/plain" https://icanhazdadjoke.com`;

// the refresh frequency in milliseconds
export const refreshFrequency = 1200 * 1000

const style = {
  glass: {
    /* From https://css.glass */
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
}

// render gets called after the shell command has executed. The command's output is passed in as a string
export function render({ output, error }) {
  const capitalizedOutput = output ? output.charAt(0).toUpperCase() + output.slice(1) : '';

  return (
    <div style={{ color: 'white', fontFamily: 'Avenir Next, sans-serif', background: 'gray', marginLeft: '1rem', marginTop: '14rem', padding: '1rem', maxWidth: '20rem', textShadow: '2px 2px 2px rgba(0,0,0,0.5)', ...style.glass }}>
      <h3 style={{ margin: 0, fontWeight: '400' }}>Dad Joke</h3>

      {error ? <p style={{ color: 'red' }}>Error: {String(error)}</p> : null}

      <p style={{ margin: 0 }}>{capitalizedOutput}</p>
    </div>
  )
}
