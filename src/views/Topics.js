import React, {useState, useEffect} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Topics = () => {
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

  const[topics,setTopics] = useState([]);
  const [start, setStart] = useState(true);
  const classes = useStyles();

  const fetchTopic = async () => {
    // const res = await fetch('https://apicdt-server.com/registerTopic')
    const res = await fetch('https://apicdt-server.com' + '/registerTopic')
    // const res = await fetch(serverURL+'registerTopic')
    const data = await res.json()
    setTopics(data);

  }

  useEffect(() => {
    if (start) {
        fetchTopic();
        setStart(false);
    }
  });


  return (
    <section className="header-gradient"><div className="container main_block">
    <div className="register_header">
        <span> 辩题列表 </span>
    </div>
    <Table className={classes.table} aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell align="center"><div style={{ fontSize: "150%" }}>IndexT</div></TableCell>
                <TableCell align="center"><div style={{ fontSize: "150%" }}>辩题</div></TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {topics.map((row) => (
                <StyledTableRow key={row.token}>
                    <TableCell align="center" component="th" scope="row"><div style={{ fontSize: "130%" }}>{row.indexT}</div></TableCell>
                    <TableCell align="center"><div style={{ fontSize: "130%" }}>{row.topic}</div></TableCell>
                </StyledTableRow>
            ))}
        </TableBody>
    </Table>
  </div>
  </section>
  )
}

export default Topics
