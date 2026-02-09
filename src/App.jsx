import { useUI } from './context/UIContext'
import { useFolders } from './hooks/useFolders'

function App() {
  const { theme, toggleTheme } = useUI()
  const { folders, addFolder } = useFolders()

  return (
    <div className="p-8">
      <h1 className="text-4xl mb-4">NoApp Debug View</h1>
      <div className="papery-card p-6 mb-4">
        <p className="mb-2">Theme: <strong>{theme}</strong></p>
        <button 
          onClick={toggleTheme}
          className="bg-paper-700 text-paper-50 px-4 py-2 rounded shadow-sm hover:bg-paper-800 transition-colors"
        >
          Toggle Theme
        </button>
      </div>

      <div className="papery-card p-6">
        <p className="mb-2">Folders in IndexedDB: <strong>{folders?.length || 0}</strong></p>
        <button 
          onClick={() => addFolder(`Test Folder ${Date.now()}`)}
          className="bg-paper-700 text-paper-50 px-4 py-2 rounded shadow-sm hover:bg-paper-800 transition-colors"
        >
          Add Test Folder
        </button>
        <ul className="mt-4 list-disc list-inside">
          {folders?.map(f => (
            <li key={f.id}>{f.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App