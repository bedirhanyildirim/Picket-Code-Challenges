function mapAsyncFunction<T, U>(
  values: T[],
  asyncFn: (value: T) => Promise<U>,
  parallelLimit: number
) {
  const runTime: Map<number, Promise<any>> = new Map() // running threads

  const addProcess = (value: any, index: number) => { // add process to threads map by index
    console.log(`Start execution #${index+1}`)
    const promise = asyncFn(value).then(() => { // map value with async function
      console.log(`Execution #${index+1} completed`)
      runTime.delete(index) // remove from threads when it is done running
    })
    runTime.set(index, promise) // add to threads when it starts
  }

  values.forEach((value:any, index:number) => { // go through all the values by one
    if (runTime.size >= parallelLimit) {  // there is no empty spot in the threads
      //console.log(`*** Execution #${index+1} waiting in the queue ****`)
      Promise.race([...runTime.values()]).then(() => { // wait till one completes
        //console.log(`*** Execution #${index+1} wait finished! ****`)
        addProcess(value, index)
      })
    } else { // there is empty spot in the threads
        addProcess(value, index)
    }
  })
}

/*** Test ***/
const start = Date.now() // Create date to see how long does it take to finish the execution

const asyncFn = async(value: number) => { // Simulation async function for parameter
  //console.log(`Execution #${value} proceeding..`)
  const res = await new Promise((resolve) => {
    setTimeout(() => {
        //console.log(`Execution #${value} completes in ${Date.now() - start}ms`)
        resolve(value)
    }, Math.random() * 1000)
  })
  return res
}

const values: number[] = [] // test values array

for (let i = 1; i <= 10; i++) { // fill the test values array with values
  values.push(i)
}

mapAsyncFunction(values, asyncFn, 3) // run the function