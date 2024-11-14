import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Resource, usersResources } from "../../mock/resources";
import { Resources } from "../../enums/resources";
import { getBalance } from "../../endpoints/farmMock";

interface ResourcesState {
  resources: Resource[];
  positions: Record<string, any>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ResourcesState = {
  resources: [
    { resourceType: Resources.stone, value: 0 },
    { resourceType: Resources.experience, value: 0 },
    { resourceType: Resources.kitsu, value: 0 },
    { resourceType: Resources.keys, value: 0 },
  ],
  positions: {},
  status: "idle",
  error: null,
};

export const fetchBalance = createAsyncThunk(
  "islands/fetchBalance",
  async (clientId: string) => {

    const response = await getBalance({ clientId });
    return response;
  }
);
const resourcesSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    setResources(state, action) {
       const data = {
        ...state,
        resources: action.payload,
      };
      return data
    },
    setResource(
      state,
      action: PayloadAction<{ resource: Resources; newValue: number }>
    ) {
      const newResources = state.resources.map((v) => {
        if (v.resourceType === action.payload.resource) {
          return { ...v, value: action.payload.newValue };
        }
        return v;
      });
      return {
        ...state,
        resources: newResources,
      };
    },
    setResourcesPosition(state, action) {
      const { type, position } = action.payload;
      state.positions[type] = position;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchBalance.fulfilled,
        (state, action: PayloadAction<Resource[]>) => {
          state.status = "succeeded";
          state.resources = action.payload;
        }
      )
      .addCase(fetchBalance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});
export const { setResources, setResource, setResourcesPosition } =
  resourcesSlice.actions;
export default resourcesSlice.reducer;
