import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {getAppConfig} from "../../endpoints/appConfigEndpoint";

interface ConfigItem {
  name?: string;
  description?: string;
  variables?: any[];
  children?: any[];
}

interface AppConfigState {
  loading: boolean;
  error: string | null;
  configs: { [key: string]: any };
}

const initialState: AppConfigState = {
  loading: false,
  error: null,
  configs: {}
};

const removeDescription = (item: ConfigItem): ConfigItem => {
  const { name, description, ...rest } = item;
  let tempChildren: any = {};
  if (rest.children) {
    rest.children.forEach((child: any) => {
      if (child.name) {
        const normalizedName = child.name.charAt(0).toLowerCase() + child.name.slice(1);
        tempChildren[normalizedName] = removeDescription(child);
      }
    })

    rest.children = tempChildren;
  }

  return rest;
};

// Async thunk to fetch config data
export const fetchAppConfig = createAsyncThunk(
  'config/fetchAppConfig',
  async (_, { rejectWithValue }) => {
    try {
      console.log('STEP 1');
      return await getAppConfig();
    } catch (err) {
      return rejectWithValue('An unexpected error occurred.');
    }
  }
);

const appConfigSlice = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    // Add any synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppConfig.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        action.payload.forEach((item: ConfigItem) => {
          if (item.name) {
            const normalizedName = item.name.charAt(0).toLowerCase() + item.name.slice(1);
            state.configs[normalizedName] = removeDescription(item);
          }
        });
      })
      .addCase(fetchAppConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default appConfigSlice.reducer;
