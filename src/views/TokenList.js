import { React, useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Footer from '../components/Footer'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
export default function TokenList() {
    const classes = useStyles();
    const [tokenList, setTokenList] = useState([]);
    const [start, setStart] = useState(true);

    const fetchToken = async (indexT) => {
        if (indexT === '') {
            return;
        }
        const res = await fetch('https://apicdt-server.com' + '/registerJudge')
        const data = await res.json()
        setTokenList(data)
    }

    useEffect(() => {
        if (start) {
            fetchToken();
            setStart(false);
        }
    });

    return (
        <section className="header-gradient"><div className="container main_block">
            <div className="register_header">
                <span> 评审代码列表 </span>
            </div>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center"><div style={{ fontSize: "150%" }}>评审姓名</div></TableCell>
                        <TableCell align="center"><div style={{ fontSize: "150%" }}>评审代码</div></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tokenList.map((row) => (
                        <StyledTableRow key={row.token}>
                            <TableCell align="center" component="th" scope="row"><div style={{ fontSize: "130%" }}>{row.judgeChiName}</div></TableCell>
                            <TableCell align="center"><div style={{ fontSize: "130%" }}>{row.token}</div></TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        <Footer/>
        </section>
    );
}
