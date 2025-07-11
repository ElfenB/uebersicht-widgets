import { fontStyles } from "./src/sharedStyles";

// this is the shell command that gets executed every time this widget refreshes
export const command = `uptime`;

// the refresh frequency in milliseconds
export const refreshFrequency = 1200 * 1000

// render gets called after the shell command has executed. The command's output is passed in as a string
export function render({ output, error }) {
  // Search for the number of days in the output string
  const uptimeDaysMatch = output.match(/(\d+)\s+day/)
  const uptimeDays = uptimeDaysMatch ? uptimeDaysMatch[1] : '0';

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', height: '100svh', ...fontStyles }}>
      <div style={{ color: 'lightgray' }}>
        {error ? <p style={{ color: 'red' }}>Error: {String(error)}</p> : null}

        {/* <p style={{ margin: 0 }}>Uptime: {output}</p> */}

        <p style={{ margin: 0 }}>Uptime: {uptimeDays} days</p>
      </div>
    </div>
  )
}
