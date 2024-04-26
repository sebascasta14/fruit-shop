import { Fruits } from './components/Fruits.jsx'
import { useAPI } from './hooks/API.js'

function App () {
  const { fruits } = useAPI()

  return (
    <div>
      <Fruits fruits = {fruits} />
    </div>
  )
}

export default App
