import readline from 'readline';
import printCube from './printCube'
import newCube, { Cube } from '../newCube'
import keyTransforms from './keyTransforms'
import { cloneCube } from '../cubeUtils'
import { FnName } from '../solve/solutionNotation';

const ctrlC = '\u0003'

const { stdin, stdout, exit } = process

stdin.setRawMode( true )
stdin.resume()
stdin.setEncoding( 'utf8' )

const recordings = []
let currentSequence: FnName[] = []
let currentRecordingStart = null
let isRecording = () => Boolean(currentSequence)

const notifyRecordingStatus = () => {
    if(isRecording()){
        stdout.write('\n\nRecording.')
    }
}

const clear = () => {
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
}

const render = (cube: Cube) => {
    clear()
    stdout.write(printCube(cube))
    notifyRecordingStatus()
}

const startRecording = () => {
    if(currentSequence.length) return
    currentRecordingStart = cloneCube(cube)
    currentSequence = []
    notifyRecordingStatus()
}
const stopRecording = () => {
    recordings.push({
        start: currentRecordingStart,
        sequence: currentSequence.slice(0)
    })
    process.stdout.clearLine()
    stdout.write(`Sequence: [${currentSequence.join(', ')}]`)
    stdout.write(`End Cube: ${JSON.stringify(cube)}`)
    currentSequence = null
    currentRecordingStart = null
}

const cubeSize = 3
const keyTransformsForCubeSize = keyTransforms(cubeSize)
let cube = newCube(cubeSize)
render(cube)
startRecording()

stdin.on('data', function(key){
  if ( key === ctrlC ) {
    clear()
    exit()
  }
  const trans = keyTransformsForCubeSize[key]
  if(trans){
      cube = trans(cube)
      render(cube)
      if(isRecording()){
          currentSequence.push(key)
      }
  }
  if(key === '1'){
      if(isRecording())
        stopRecording()
      else
        startRecording()
  }

});