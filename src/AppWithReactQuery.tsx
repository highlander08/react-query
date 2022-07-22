import { useState } from "react";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
interface IData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const getUser = async (id: number) => {
  const request = await fetch(`https://reqres.in/api/users/${id}?delay=1`);

  const response = await request.json();

  if (!request.ok) {
    throw new Error(response.error);
  }

  return response.data as IData;
};

function AppWithReactQuery() {
  const [currentUserId, setCurrentUserId] = useState(1);
  const { data, isError, isLoading, isFetching } = useQuery(
    ["users", currentUserId],
    () => getUser(currentUserId),
    {
      //quantidade de tempo que o cache permanece valido
      //informação que nao atualiza com muito frequencia usa isso
      // staleTime: 50000,
    }
  );
  if (isError) {
    return (
      <section>
        <p>Server Error</p>
      </section>
    );
  }

  if (!data || isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <img src={data.avatar} alt="avatar" />
      <p>
        {data.first_name} {data.last_name} - {data.id}
      </p>
      <p>Email: {data.email}</p>
      <div>
        <button onClick={() => setCurrentUserId((prev) => prev - 1)}>
          Prev
        </button>
        <button onClick={() => setCurrentUserId((prev) => prev + 1)}>
          Next
        </button>
      </div>
      {isFetching && (
        <small>Revalidar dados: Nos estamos atualizando seus dados</small>
      )}
    </section>
  );
}

export default AppWithReactQuery;
