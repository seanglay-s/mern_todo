import PageContainer from "../../components/container/PageContainer"
import TodoScreen from "../../components/screen/todo"
import Breadcrumb from "../../components/shared/Breadcrumb"

const Todo = () => {
    return <PageContainer title="Todo" description="this is todo List page">
        <Breadcrumb title="Todo" items={[]} />
        <TodoScreen />
    </PageContainer>
}

export default Todo