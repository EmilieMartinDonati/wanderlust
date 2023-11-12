import { useMemo, useCallback } from 'react';


const ModulableTableHeader = ({ headers = [] }) => {

  /** nota bene : header is expected to have a name and a label, so as to map with data */

  return (<thead>
    <tr>{headers.map((header) => <th>{header.name}</th>)}</tr>
  </thead>)
}

export default ModulableTableHeader;