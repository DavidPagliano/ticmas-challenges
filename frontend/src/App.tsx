import React, { useEffect, useState } from "react";
import { pelicula } from "./components/peliculas/pelicula";
import Pagination from "./components/pagination/paginacion";
import importCSV from './components/ImportPeliculas/importPelicula';

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [coinsData, setPeliculasData] = useState<pelicula[]>([]);

  const handlePrevPage = (prevPage: number) => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = (nextPage: number) => {
    console.log(nextPage);
    setPage((nextPage) => nextPage + 1);
  };

  useEffect(() => {
    console.log("effct");

    const fetchData = async () => {
      const peliculasResponse = await fetch(
        ``
      );
      
      const result = await peliculasResponse.json();
      console.log(result);
      setPeliculasData(result);
      setTotalPages(totalPages);
    };

    fetchData();
  }, [page]);
   
  return (
    <>
    
      <table className="table" width="80%">
        <thead>
          <tr>
              <th>Titulo</th>
              <th>Genero</th>
              <th>Año</th>
              <th>Director</th>
              <th>Actor</th>
          </tr>
        </thead>
      </table>
      {coinsData.map((pelicula) => {
            return (
              <table className="table" width="80%">
                <tr>
                  <div id={pelicula._id} key={pelicula._id}>
                    <td>{pelicula.titulo} </td>
                    <td>{pelicula.genero}</td>
                    <td>{pelicula.año}</td>
                    <td>{pelicula.director}</td>
                    <td>{pelicula.actor}</td>
                  </div>
                </tr>
              </table>        
            );
      })}
      <Pagination
        totalPages={totalPages}
        currentPage={page}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
    </>
  );
};

export default App;

