import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice =createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500'}),
    tagTypes: ['Todos'],//to get the data on change
    endpoints:(builder)=>({ 
        getTodos: builder.query({
        query:()=>'/todos',
        providesTags:['Todos']
        }),
        addTodo: builder.mutation({
            query :(todo)=>({
                url:'/todos',
                method: 'POST',
                body:todo,
            }),
            invalidatesTags:['Todos']//to get the data on change
        }),
        updateTodo: builder.mutation({
            query :(todo)=>({
                url:`/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags:['Todos']//to get the data on change
        }),
        deleteTodo: builder.mutation({
            query: ({id})=>({
                url: `todos/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags:['Todos']//to get the data on change
        })
    }), 

})

//custom hooks from apiSlice
export const {
        useGetTodosQuery,
        useAddTodoMutation,
        useUpdateTodoMutation,
        useDeleteTodoMutation 
    }= apiSlice;