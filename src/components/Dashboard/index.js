import React, { useEffect, useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { Web3 } from "web3";
import { useNavigate } from "react-router-dom";
import CustomizedTable from "../utils/CustomizedTable";
import ABI from "../../ABIs/DataFeedDAO.json";

let data = [];
function createData(id, url) {
  return { id, url };
}

const Dashboard = () => {
  const [rows, setRows] = useState([]);

  let navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };

  const init = async () => {
    const web3Instance = new Web3(window.ethereum);

    try {
      const contractABI = ABI.ABI;
      const contract = new web3Instance.eth.Contract(
        contractABI,
        "0xf3834e0FfEE30d9fCE2608fab49fF539A6c13c50"
      );
      const cnt = await contract.methods.cnt().call();
      data = [];
      for (let i = 0; i < cnt; i++) {
        data.push(createData(i, await contract.methods.getUrl(i).call()));
      }
      setRows(data);
    } catch (error) {
      console.error("Error signing message:", error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <Container
        style={{
          width: "50%",
          position: "absolute",
          top: "10vh",
          left: "25%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h1 style={{ textAlign: "center" }}>Dashboard</h1>
          <CustomizedTable rows={rows} />
          <Button fullWidth variant="contained" onClick={goToRegister}>
            Go to Register Page
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard;
