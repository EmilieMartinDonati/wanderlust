import {useState, useEffect} from 'react';

import ModulableTableHeader from './modulableTableHeader';
import ModulableTableBody from './ModulableTableBody';


/** reminder that in CSS it looks like this :
 * <table>
 * <thead></thead>
 * </table>
 */


const ModulableTable = ({ headers = [], data = []}) => {

  return (<table>
    <ModulableTableHeader headers={headers}/>
    <ModulableTableBody headers={headers} data={data} />
  </table>)
}

export default ModulableTable;