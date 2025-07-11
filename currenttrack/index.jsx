export const command = "osascript ./currenttrack/applescript.scpt | echo"
export const refreshFrequency = 1000

const SIZE = '10rem'

export const className = {
  bottom: 'auto',
  right: 'auto',
  left: 0,
  top: 0,
  width: "30vh",
  fontSize: "1vh",
  lineHeight: "1.5",
  margin: "1rem 2rem",
  fontFamily: "Input Serif Narrow, fixed",
  fontWeight: "500",
  color: "white"
}

export const initialState = { playing: false }

export const updateState = (event, previousState) => {
  if (event.error) {
    return { ...previousState, warning: `We got an error: ${event.error}` }
  }

  const [_, state, _app, track, artist, position, length, albumart] = event.output.split("\n")

  const playing = state === "playing"

  return playing ? { playing, data: { track, artist, position, length, albumart } } : { playing }
}

function secToMin(sec) {
  const minutes = Math.floor(sec / 60)
  const seconds = sec % 60
  const paddedMinutes = String(minutes.toFixed(0)).padStart(2, '0')
  const paddedSeconds = String(seconds.toFixed(0)).padStart(2, '0')
  return `${paddedMinutes}:${paddedSeconds}`
}

function displayData({ artist, track, position, length, albumart }) {
  const parsedLength = Number(length)
  const parsedPosition = Number(position)
  const percent = Math.floor((parsedPosition / parsedLength) * 100)
  const style = {
    position: 'absolute',
    top: 'auto',
    left: 0,
    bottom: '-.5vh',
    width: `${percent}%`,
    background: 'white',
    height: '.2vh',
    transition: 'width 1s ease',
  }
  const textStyle = { textAlign: 'center', textShadow: '2px 2px 2px rgba(0,0,0,0.5)', margin: '0 0.5rem' }
  const displayLength = secToMin(parsedLength)
  let displayPosition = secToMin(parsedPosition)

  while (displayPosition.length < displayLength.length) {
    displayPosition = "00:" + displayPosition
  }

  return (
    <div style={{ backgroundImage: `url(${albumart})`, backgroundSize: 'cover', height: SIZE, width: SIZE, borderRadius: '0.5rem', color: 'white', fontFamily: 'Avenir Next, sans-serif' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', height: '100%', width: '100%' }}>
        <p style={textStyle}>{artist} - {track}</p>
        <p style={textStyle}>{displayPosition} - {displayLength}</p>
        <div style={style}></div>
      </div>
    </div>
  )
}

export function render({ playing, data }) {
  if (!playing) {
    return null
  }

  return (
    <div style={{ marginLeft: '20rem', height: SIZE, width: SIZE }}>{displayData(data)}</div>
  )
}
