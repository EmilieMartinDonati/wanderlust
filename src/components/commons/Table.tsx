import ModulableTableHeader from './modulableTableHeader';
import ModulableTableBody from './ModulableTableBody';

export type TableHeader = { name: string; label?: string }

interface ModulableTableProps {
  headers?: TableHeader[]
  data?: unknown[]
}

/** reminder that in CSS it looks like this :
 * <table>
 * <thead></thead>
 * </table>
 */

const ModulableTable = ({ headers = [], data = []}: ModulableTableProps) => {

  return (<table>
    <ModulableTableHeader headers={headers}/>
    <ModulableTableBody headers={headers} data={data} />
  </table>)
}

export default ModulableTable;
