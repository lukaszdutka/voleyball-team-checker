import './App.css';
import {useEffect, useState} from "react";
import {Grid} from "@material-ui/core";

function App() {
    const [team, setTeam] = useState(['Daria Andrzejczyk',
        'Justyna Kukła',
        'Kuba Adamczyk',
        'Marta Głowacka',
        'Mateusz Sołtys',
        'Natalia Świstak',
        'Paweł Kukła',
        'Piotr Sobota',
        'Sylwia Besztyga',
        'Sylwia Szpak',
        'Maja Majewska',
        'Łukasz Dutka']);

    const [noLikeTeam, setNoLikeTeam] = useState([])

    const [input, setInput] = useState('')

    useEffect(() => {
        console.log('useEffect')
        const splitLines = str => str.split(/\r?\n/);
        let splitLines1 = splitLines(input);
        let tempTeam = team;
        let areWeThereYet = false;
        for (let i = 1; i < splitLines1.length; i++) {
            console.log(splitLines1[i])
            if (!areWeThereYet && splitLines1[i].trim() === "Reakcje na wiadomość") {
                areWeThereYet = true;
                console.log('true')
            }
            if (areWeThereYet) {
                console.log('filtering')
                tempTeam = tempTeam.filter(e => e !== splitLines1[i].trim())
            }
        }
        setNoLikeTeam(tempTeam)
    }, [input])

    const renderTeam = (t) => {
        return t.map((name) => {
            return (
                <div key={name}>{name}</div>
            );
        })
    }

    return (
        <div className="App">
            <Grid
                container
                spacing={5}
                alignItems="center"
                style={{
                    margin: 0,
                    width: "100%",
                }}
            >
                <Grid item md={4} xs={4}>
                    <h1>Voleyball Team Checker</h1>
                    <h2>Wszyscy z teamu:</h2>
                    <div>{renderTeam(team)}</div>
                </Grid>
                <Grid item md={4} xs={4}>

                    <div>tu wklej input:</div>
                    <textarea
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <p>Instrukcja:</p>
                    <p>1. Otwórz okienko z reakcjami</p>
                    <p>2. Zaznacz wszystko (ctrl+a / cmd+a)</p>
                    <p>3. Skopiuj (ctrl+s / cmd+s)</p>
                    <p>4. Wklej całość do pola wyżej (ctrl+v / cmd+v)</p>
                    <p><b>Tyle! Powinno się wyświetlić kto nie dał lajka</b></p>

                </Grid>
                <Grid item md={4} xs={4}>
                    <h2> Kto nie dał lajka:</h2>
                    <div style={{
                        color: "red",
                    }}>{renderTeam(noLikeTeam)}</div>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
