import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { Modal } from '@mui/material';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import axios from 'axios';
import "./App.css";

 

const Tab = () => {
   
    const [isLoading, setIsLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [modalUser, setModalUser] = useState({})
    const [visible, setVisible] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);      
   
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    useEffect(() => {
        async function loadData() {
            const { data } = await axios.get('https://randomuser.me/api/?results=50')

            setRows(data.results);
            setModalUser(data.results[0])
            setIsLoading(false)

        }
        loadData();
        
    }, [])
    
        if(isLoading){
        return (
            <Loader
            type="TailSpin"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        )
    }
    if(!isLoading){
        return (
            <>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    BackdropComponent={Backdrop}
                    open={visible}
                    onClose={() => setVisible(!visible)}
                >
                    <div className="back">
                        <div className="front">
                            <Card className="card" key={modalUser.name}>
                                <img src={modalUser.picture.large} className="user-photo"/>
                            <CardContent>
                                <Table>
                                    <TableRow >
                                        <TableCell><span>Nome:</span>{modalUser.name.first} {modalUser.name.last}</TableCell>
                                        <TableCell><span>Id:</span> {modalUser.id.value}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><span>Gênero</span> {modalUser.gender}</TableCell>
                                        <TableCell><span>Email:</span> {modalUser.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><span>Data de nascimento:</span> {new Intl.DateTimeFormat('pt-Br').format(new Date(modalUser.dob.date))}</TableCell>
                                        <TableCell><span>Telefone:</span> {modalUser.cell}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><span>Nacionalidade:</span> {modalUser.location.state}</TableCell>
                                        <TableCell><span>Endereço:</span> {modalUser.location.city}</TableCell>
                                    </TableRow>
                                </Table>
                            </CardContent>    
                            </Card>
    
                        </div>
                    </div>
                </Modal>

                <Paper className="paper" >
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
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => (
                                <TableRow key={index} className="table-r">
                                    <TableCell>{row.name.first}</TableCell>
                                    <TableCell>{row.gender}</TableCell>
                                    <TableCell>{new Intl.DateTimeFormat('pt-Br').format(new Date(row.dob.date))}</TableCell>
                                    <TableCell>
                                        <button onClick={() => {
                                            setModalUser(row)
                                            setVisible(true);
                                        }} className="btn-view">View</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                
            </>
        )
    }


}

export default Tab;