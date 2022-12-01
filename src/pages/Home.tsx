import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  addIncome,
  addOutcome,
  updateBalance,
} from "../store/modules/WalletSlice";

import logo from "./logo.png";

const Home: React.FC = () => {
  const [valor, setValor] = useState<number>(0);
  const [type, setType] = useState<string>("income");
  const walletRedux = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();

  const deposito = () => {
    if (valor <= 0) {
      alert("Digite um número maior ou igual a zero.");
      return;
    }
    if (type === "income") {
      dispatch(addIncome(valor));
      dispatch(updateBalance());
      setValor(0);
    } else {
      if (walletRedux.balance - valor <= -1001) {
        alert("voce chegou no cheque especial");
        return;
      }
      dispatch(addOutcome(valor));
      dispatch(updateBalance());
      setValor(0);
    }
  };
  return (
    <React.Fragment>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: "400px",
            backgroundColor: "rgba(255,255,255,0.8)",
            padding: "15px",
            margin: "20px 100px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            boxShadow: "2px 8px 10px #000000",
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <img
                  src={logo}
                  alt="logo"
                  style={{ width: "150px", margin: "0px" }}
                />
                <h1 style={{ color: "#1976d2", margin: "0px" }}>
                  {" "}
                  Carteira Growdev
                </h1>
              </Grid>
              <Grid item sx={{ fontSize: "40px", margin: "0px" }} xs={12}>
                R$
                {walletRedux.balance}
              </Grid>
              <Grid item xs={12}>
                <h3
                  style={{
                    textAlign: "start",
                    color: "#1976d2",
                    margin: "0px",
                  }}
                >
                  <MonetizationOnIcon fontSize="large" /> SALDO + LIMITE:
                </h3>
                <p style={{ fontSize: "40px", margin: "0px" }}>
                  R${walletRedux.balance + 1000}
                </p>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              borderRadius: 3,
            }}
          >
            <TextField
              id="filled-basic"
              label="Valor"
              fullWidth
              variant="filled"
              type="text"
              sx={{
                borderRadius: 2,
                boxShadow: "2px 3px 5px #000000",
                marginBottom: "5px",
              }}
              value={valor}
              onChange={(ev) => setValor(Number(ev.target.value))}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "start" }}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Tipo:
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(ev) => setType(ev.target.value)}
                value={type}
              >
                <FormControlLabel
                  value="income"
                  control={<Radio />}
                  label="Entrada"
                />
                <FormControlLabel
                  value="outcome"
                  control={<Radio />}
                  label="Saída"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              sx={{
                borderRadius: 2,
                boxShadow: "2px 3px 5px #000000",
                marginBottom: "5px",
                height: "50px",
              }}
              variant="contained"
              onClick={deposito}
              fullWidth
            >
              Enviar
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Paper
              elevation={2}
              sx={{
                padding: "5px",
                mt: "20px",
                borderRadius: 2,
                boxShadow: "2px 3px 5px #000000",
              }}
            >
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h6" sx={{ color: "primary.main" }}>
                    Entradas
                  </Typography>
                  {walletRedux.income.map((item, index) => {
                    return (
                      <div key={index}>
                        <div>{`ID ${index} | ${item}`}</div>
                      </div>
                    );
                  })}
                </Grid>
                <Grid item xs={6} sx={{ borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ color: "error.main" }}>
                    Saídas
                  </Typography>
                  {walletRedux.outcome.map((item, index) => {
                    return (
                      <div key={index}>
                        <div>{`ID ${index} | ${item}`}</div>
                      </div>
                    );
                  })}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
