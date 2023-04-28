import { UserData, UserState } from "@/models/user.model";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as serverService from "@/services/serverService";
import httpClient from "@/utils/httpClient";
import { RootState } from "../store";
import { constant } from "@/utils/constant";
import { removeLocal, setWithExpiry } from "@/utils/localHandler";

const initialState: UserState = {
  user: undefined,
  accessToken: "",
  isAuthenticated: false,
  isAuthenticating: true,
};

interface setUser {
  user: UserData;
}

interface SignInAction {
  username: string;
  password: string;
}

export const signIn = createAsyncThunk(
  "user/signin",
  async (credentail: SignInAction) => {
    const response = await serverService.signIn(credentail);

    // SET HEADER TOKEN
    httpClient.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${response.acessToken}`;
      return config;
    });

    return response;
  }
);

export const signOut = createAsyncThunk("user/signout", async () => {
  await serverService.signOut;

  // CLEAR HEADER TOKEN
  httpClient.interceptors.request.use((config) => {
    config.headers["Authorization"] = "";
    return config;
  });
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<setUser>) => {
      state.user = action.payload.user;
    },
    restoreState: (state, action: PayloadAction<UserState>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isAuthenticating = false;

      // SET HEADER TOKEN
      httpClient.interceptors.request.use((config) => {
        config.headers[
          "Authorization"
        ] = `Bearer ${action.payload.accessToken}`;
        return config;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.accessToken = action.payload.acessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isAuthenticating = false;

      const { accessToken, user, isAuthenticated, isAuthenticating } = state;

      setWithExpiry(constant.STROAGE_TOKEN, {
        accessToken,
        user,
        isAuthenticated,
        isAuthenticating,
      });
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.accessToken = "";
      state.user = undefined;
      state.isAuthenticated = false;
      state.isAuthenticating = false;
      // CLEAR LOCAL
      removeLocal(constant.STROAGE_TOKEN);
    });
  },
});

export const { setUser, restoreState } = authSlice.actions;

export const userSelector = (store: RootState): UserData | undefined =>
  store.user.user;

export default authSlice.reducer;
