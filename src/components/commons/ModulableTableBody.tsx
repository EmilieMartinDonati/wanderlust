import type { TableHeader } from './Table';

interface ModulableTableBodyProps {
  headers?: TableHeader[]
  data?: unknown[]
}

const ModulableTableBody = ({headers = [], data = []}: ModulableTableBodyProps) => {

  return (<tbody>

  </tbody>)
}

export default ModulableTableBody;
