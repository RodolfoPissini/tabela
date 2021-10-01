import { Component } from "react";

import Mod from './modal';
import InputBase from '@material-ui/core/InputBase';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import "./App.css";

class Tab extends Component {
    state = {
        rows:[]
    }
    componentDidMount() {
        fetch('https://randomuser.me/api/?results=50')
        .then((response) => response.json())
        .then((response) =>{
            this.setState({rows: response.results});
        })
        
    }
    
      
    render() {
        const { rows } = this.state;
        
        return(
            <>
            <InputBase
            className="input-base"
            placeholder="Digite o nome do usuário"
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Birth</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                       {rows.map((rows)=>(
                           <TableRow key={rows.results} className="table-r">
                               <TableCell>{rows.name.first}</TableCell>
                               <TableCell>{rows.gender}</TableCell>
                               <TableCell>{rows.dob.date}</TableCell>
                               <TableCell><Mod/></TableCell>
                           </TableRow>
                       ))}
                    </TableBody>
                </Table>
            </TableContainer>
            </>

        )
    }
}
export default Tab;