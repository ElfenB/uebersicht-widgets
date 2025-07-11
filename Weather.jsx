// export const command = "echo 'Hello World!'"

const weatherUrl = 'https://api.open-meteo.com/v1/dwd-icon?latitude=49.9708&longitude=8.0588&current=temperature_2m,apparent_temperature,precipitation,rain'

// this is the shell command that gets executed every time this widget refreshes
export const command = `curl -sS "${weatherUrl}"`;

// the refresh frequency in milliseconds
export const refreshFrequency = 1200 * 1000

function parseOutput(output) {
  try {
    return JSON.parse(output)
  } catch (err) {
    console.error(err);
    return undefined
  }
}

const style = {
  entries: {
    padding: '1rem',
    margin: 0
  },
  glass: {
    /* From https://css.glass */
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  }
}

// render gets called after the shell command has executed. The command's output is passed in as a string
export function render({ output }) {
  const parsedOutput = parseOutput(output)

  if (!parsedOutput) {
    return null
  }

  const lastFetchedDate = new Date()

  // Logging when data is being fetched
  console.log('fetching data:', lastFetchedDate.toLocaleString(), parsedOutput)

  return (
    <div style={{ color: 'white', fontFamily: 'Avenir Next, sans-serif', background: 'gray', marginLeft: '1rem', marginTop: '1rem', textShadow: '2px 2px 2px rgba(0,0,0,0.5)', ...style.glass }}>
      <h1 style={{ padding: '1rem 1rem 0 1rem', margin: 0, fontWeight: '400' }}>Wetter Ingelheim</h1>

      <div>
        <p style={style.entries}>
          Temperatur: {parsedOutput.current.temperature_2m} {parsedOutput.current_units.temperature_2m} - Gefühlt: {parsedOutput.current.apparent_temperature} {parsedOutput.current_units.apparent_temperature}
        </p>

        <hr style={{
          border: 0,
          margin: 0,
          height: '1px',
          backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))'
        }} />

        <p style={style.entries}>
          Niederschlag: {parsedOutput.current.precipitation} {parsedOutput.current_units.precipitation} - Regen: {parsedOutput.current.rain} {parsedOutput.current_units.rain}
        </p>

      </div>

      <p style={{ margin: 0, fontSize: 8, textAlign: 'center', paddingBottom: 5 }}>
        last checked: {lastFetchedDate.toLocaleTimeString()} Uhr
      </p>

      {/* Activate for debugging */}
      {/* {Object.keys(parsedOutput).map((key) => {
        return (
          <div key={key}>
            <p>{key}: {JSON.stringify(parsedOutput[key])}</p>
          </div>
        )
      })} */}
    </div>
  )
}
