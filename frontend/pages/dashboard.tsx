import { useContext } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../contexts/AuthContext";
import { setupAPIClient } from "../services/Api";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard(){
    const {user, isAuthenticated} = useContext(AuthContext);

    return (
        <>
        <h1>
            Dashboard : {user?.email}
        </h1>

        <Can permissions={['metrics.list']}>
            <div>Métricas</div>
        </Can>
        </>
    )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/me');
  
    console.log(response.data)
  
    return {
      props: {}
    }
  })