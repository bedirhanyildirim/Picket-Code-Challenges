/*** map function ***/
function mapAsyncFunction<T, U>(
  values: T[],
  asyncFn: (value: T) => Promise<U>,
  parallelLimit: number
) {
  const threads: Map<number, Promise<U>> = new Map() // running threads
  let nextProcess: number = 0 // the next process index in values array

  const addProcess = (value: T, index: number) => { // add process to threads map by index
    if (nextProcess < parallelLimit) {
      console.log(`Start execution #${index+1}`)
    }
    const promise = asyncFn(value).then((res) => { // map value with async function
      if (nextProcess < values.length) {
        console.log(`Execution #${index+1} completes, start execution #${nextProcess + 1}`)
      } else {
        console.log(`Execution #${index+1} completes`)
      }
      threads.delete(index) // remove from threads when it is done running
      return res
    })
    threads.set(index, promise) // add to threads when it starts
  }

  const isFree = ():boolean => threads.size < parallelLimit // is there an empty spot in the threads
  const endProcess = () => { // stop application function
    clearInterval(r)
    console.log("interval cleared!")
  }

  let r = setInterval(function() { // application starts
    if (values.length == nextProcess) { // all process' started
      endProcess() // stop applicable
    } else if (isFree()) { // if there is empty spot
      addProcess(values[nextProcess], nextProcess) // start next process
      nextProcess++ // increase next process index
    }
  }, 5) // check every 5ms
}

/*** Test ***/
const start = Date.now() // Create date to see how long does it take to finish the execution

const asyncFn = async(value: number) => { // Simulation async function for parameter
  //console.log(`Execution #${value} proceeding..`)
  const res = await new Promise((resolve) => {
    setTimeout(() => {
        //console.log(`Execution #${value} completes in ${Date.now() - start}ms`)
        resolve(value)
    }, Math.random() * 5000)
  })
  return res
}

const values: number[] = [] // test values array

for (let i = 1; i <= 100; i++) { // fill the test values array with values
  values.push(i)
}

mapAsyncFunction(values, asyncFn, 15) // run the function