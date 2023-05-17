import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { routeBlock, routeDefinedStaff, routeDefinedAdmin } from './Configs';
import DefaultLayout from './Layouts/DefaultLayout';
import { useAppSelector } from './Redux/hooks';
import { BlockRouter, ProtectRouter } from './routes/CustomRoute';
import { getStoredUser } from './Utils/helper/localStorage';

function App() {
    const access_Token = useAppSelector((state) => state.auth.access_Token);
    const user = getStoredUser();

    console.log(access_Token);

    // useEffect(() => {
    //     instanceRequest.defaults.headers.common[
    //         'Authorization'
    //     ] = `Bearer ${access_Token}`;
    // }, [access_Token]);
    return (
        <div>
            <Router>
                <div className="App">
                    <Routes>
                        {/* {routeDefined.map((route, index) => {
                        const ElementConvert = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <DefaultLayout>
                                        <ElementConvert />
                                    </DefaultLayout>
                                }
                            />
                        );
                    })} */}

                        <Route element={<BlockRouter />}>
                            {routeBlock.map((route, index) => {
                                const ElementConvert = route.component;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            // <DefaultLayout>
                                            // </DefaultLayout>
                                            <ElementConvert />
                                        }
                                    />
                                );
                            })}
                        </Route>

                        <Route element={<ProtectRouter />}>
                            {user.role == 1
                                ? routeDefinedAdmin.map((route, index) => {
                                      const ElementConvert = route.component;
                                      return (
                                          <Route
                                              key={index}
                                              path={route.path}
                                              element={
                                                  <DefaultLayout>
                                                      <ElementConvert />
                                                  </DefaultLayout>
                                              }
                                          />
                                      );
                                  })
                                : routeDefinedStaff.map((route, index) => {
                                      const ElementConvert = route.component;
                                      return (
                                          <Route
                                              key={index}
                                              path={route.path}
                                              element={
                                                  <DefaultLayout>
                                                      <ElementConvert />
                                                  </DefaultLayout>
                                              }
                                          />
                                      );
                                  })}
                        </Route>
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </div>
    );
}

export default App;
