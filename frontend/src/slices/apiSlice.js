// this is the root file for the apis

import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({baseQuery:''});// e.g., "http://localhost:3000\api"

export const apiSlice = createApi({
    baseQuery, 
    tagTypes:['user'],
    endpoints:(builder)=>({}),
})

