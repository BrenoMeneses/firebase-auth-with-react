import React, { useState, useEffect } from 'react'
import "./ListaDeTarefas.css"
import 'firebase/compat/auth'; // alterado aqui
import firebase from 'firebase/compat/app'; // alterado aqui

const firebaseConfig = {
    apiKey: "AIzaSyC7ksLScvJFR-bYnG41NT6HQaX1iHpsyro",
    authDomain: "appweb-b01fd.firebaseapp.com",
    projectId: "appweb-b01fd",
    storageBucket: "appweb-b01fd.appspot.com",
    messagingSenderId: "169673604399",
    appId: "1:169673604399:web:65c156c7a7f2b03afbf5da"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

function ListaDeTarefas() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        } else {
            window.location.href = "/cadastro"
        }
    })

    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState('');
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        const tarefasArmazenadas = JSON.parse(localStorage.getItem('tarefas'));
        if (tarefasArmazenadas) {
            setTarefas(tarefasArmazenadas);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }, [tarefas]);

    const adicionarTarefa = () => {
        if (novaTarefa.trim() !== '') {
            setTarefas([...tarefas, novaTarefa]);
            setNovaTarefa('');
            setMostrarFormulario(false);
        }
    };

    const removerTarefa = (index) => {
        const novaLista = [...tarefas];
        novaLista.splice(index, 1);
        setTarefas(novaLista);
    };

    const handleLogout = async () => {
        try {
          await firebase.auth().signOut()
        } catch (err) {
        }
      }

    return (
        <div className="lista-de-tarefas">
            <h1>Tarefas Etec</h1>
            {mostrarFormulario && (
                <div className="adicionar-tarefa">
                    <input
                        type="text"
                        value={novaTarefa}
                        onChange={(e) => setNovaTarefa(e.target.value)}
                        placeholder="Digite uma nova tarefa"
                    />
                    <button onClick={adicionarTarefa}>Adicionar</button>
                </div>
            )}
            {!mostrarFormulario && (
                <button className="botao-flutuante" onClick={() => setMostrarFormulario(true)}>+</button>
            )}
            <ul>
                {tarefas.map((tarefa, index) => (
                    <li key={index} className="tarefa">
                        <div>{tarefa}</div>
                        <div className="remover-tarefa" onClick={() => removerTarefa(index)}>Deslize para excluir</div>
                    </li>
                ))}
            </ul>

            <button className="botao-logout" onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default ListaDeTarefas