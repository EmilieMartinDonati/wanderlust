import type { TableHeader } from './Table';

interface ModulableTableHeaderProps {
  headers?: TableHeader[]
}

const ModulableTableHeader = ({ headers = [] }: ModulableTableHeaderProps) => {

  /** nota bene : header is expected to have a name and a label, so as to map with data */

  return (<thead>
    <tr>{headers.map((header) => <th key={header.name}>{header.name}</th>)}</tr>
  </thead>)
}

export default ModulableTableHeader;
