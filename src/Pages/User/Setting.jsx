import React, { useState } from 'react';
import Collection from './Collection';
import UserModel from './UserModel';
import Sidebar from '../../Components/Sidebar';
import Location from './StoresAddress';
import Store from './Store';
import ScopSettings from './Keywords';
import Addteam from './Addteam';
import TemplateList from './TemplateList';

const Setting = () => {
  const [activeTab, setActiveTab] = useState('Collections');
   
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="flex text-gray-900 h-[100vh]">
      <Sidebar />
      <div
        className="container"
        style={{
          borderRadius: "20px",
          marginTop: "2%",
        }}
      >
        <div className="row mt-5">
          <div className="nk-block-head nk-block-head-sm">
            <div className="nk-block-head-content p-[10px]">
              <h1 className="nk-block-title font-bold">Setting</h1>
            </div>
          </div>
          <div className="card shadown-none px-[10px]">
            <div className="card-body">
              <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px">
                  <li className="me-2">
                    <a
                      href="#Collections"
                      className={`inline-block p-4 border-b-2 ${
                        activeTab === 'Collections'
                          ? 'text-blue-600 border-blue-600'
                          : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                      } rounded-t-lg`}
                      onClick={() => handleTabClick('Collections')}
                    >
                      Collections
                    </a>
                  </li>
                  <li className="me-2">
                    <a
                      href="#Models"
                      className={`inline-block p-4 border-b-2 ${
                        activeTab === 'Models'
                          ? 'text-blue-600 border-blue-600'
                          : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                      } rounded-t-lg`}
                      onClick={() => handleTabClick('Models')}
                    >
                      Models
                    </a>
                  </li>
                  <li className="me-2">
                    <a
                      href="#StoresAddress"
                      className={`inline-block p-4 border-b-2 ${
                        activeTab === 'StoresAddress'
                          ? 'text-blue-600 border-blue-600'
                          : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                      } rounded-t-lg`}
                      onClick={() => handleTabClick('StoresAddress')}
                    >
                      Stores Address
                    </a>
                  </li>
                  <li className="me-2">
                    <a
                      href="#Stores"
                      className={`inline-block p-4 border-b-2 ${
                        activeTab === 'Stores'
                          ? 'text-blue-600 border-blue-600'
                          : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                      } rounded-t-lg`}
                      onClick={() => handleTabClick('Stores')}
                    >
                      Stores
                    </a>
                  </li>
                  <li className="me-2">
                    <a
                      href="#Keywords"
                      className={`inline-block p-4 border-b-2 ${
                        activeTab === 'Keywords'
                          ? 'text-blue-600 border-blue-600'
                          : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                      } rounded-t-lg`}
                      onClick={() => handleTabClick('Keywords')}
                    >
                      Keywords filter
                    </a>
                  </li>
                  <li className="me-2">
                    <a
                      href="#AddUser"
                      className={`inline-block p-4 border-b-2 ${
                        activeTab === 'AddUser'
                          ? 'text-blue-600 border-blue-600'
                          : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                      } rounded-t-lg`}
                      onClick={() => handleTabClick('AddUser')}
                    >
                      Add User
                    </a>
                  </li>
                  <li className="me-2">
                    <a
                      href="#TemplateList"
                      className={`inline-block p-4 border-b-2 ${
                        activeTab === 'TemplateList'
                          ? 'text-blue-600 border-blue-600'
                          : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                      } rounded-t-lg`}
                      onClick={() => handleTabClick('TemplateList')}
                    >
                      Template List
                    </a>
                  </li>
                </ul>
                <div className="p-5">
                  <div
                    className={activeTab === 'Collections' ? 'block opacity-100' : 'hidden opacity-0'}
                    id="Collections"
                    role="tabpanel"
                  >
                    <Collection activeTab={activeTab} setActiveTab={setActiveTab} />
                  </div>
                  <div
                    className={activeTab === 'Models' ? 'block opacity-100' : 'hidden opacity-0'}
                    id="Models"
                    role="tabpanel"
                  >
                    <UserModel activeTab={activeTab} setActiveTab={setActiveTab} />
                  </div>
                  <div
                    className={activeTab === 'StoresAddress' ? 'block opacity-100' : 'hidden opacity-0'}
                    id="StoresAddress"
                    role="tabpanel"
                  >
                    <Location activeTab={activeTab} setActiveTab={setActiveTab} />
                  </div>
                  <div
                    className={activeTab === 'Stores' ? 'block opacity-100' : 'hidden opacity-0'}
                    id="Stores"
                    role="tabpanel"
                  >
                    <Store activeTab={activeTab} setActiveTab={setActiveTab} />
                  </div>
                  <div
                    className={activeTab === 'Keywords' ? 'block opacity-100' : 'hidden opacity-0'}
                    id="Keywords"
                    role="tabpanel"
                  >
                    <ScopSettings activeTab={activeTab} setActiveTab={setActiveTab} />
                  </div>
                  <div
                    className={activeTab === 'AddUser' ? 'block opacity-100' : 'hidden opacity-0'}
                    id="AddUser"
                    role="tabpanel"
                  >
                    <Addteam activeTab={activeTab} setActiveTab={setActiveTab} />
                  </div>
                  <div
                    className={activeTab === 'TemplateList' ? 'block opacity-100' : 'hidden opacity-0'}
                    id="TemplateList"
                    role="tabpanel"
                  >
                    <TemplateList activeTab={activeTab} setActiveTab={setActiveTab} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
