import useContador from "../hooks/useContador";

const Contador = () => {
    const {count, increment, decrement, reset} = useContador(0);
    return ( 
        <div>
            <h1>Contador: {count}</h1>
            <button onClick={increment}>Incrementar</button>
            <button onClick={decrement}>Decrementar</button>
            <button onClick={reset}>Reiniciar</button>
        </div>
    );
}
 
export default Contador;