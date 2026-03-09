import axios from 'axios';

const THEMATIC_BASE_URL = 'https://staging-api-2.hellothematic.com/api/v2';

const initUserConfig = () => {
  if (!localStorage.getItem('thematic_user_id')) {
    localStorage.setItem('thematic_user_id', '820623');
  }
  if (!localStorage.getItem('thematic_project_id')) {
    localStorage.setItem('thematic_project_id', '229749');
  }
  if (!localStorage.getItem('thematic_token')) {
    localStorage.setItem('thematic_token', 'c95e90bcda5c440f2c364fe7f3370a43');
  }
};

initUserConfig();

const thematicClient = axios.create({
  baseURL: THEMATIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('thematic_token')}`,
  },
  timeout: 20000, // 20 secs
});

export const getUserId = () => localStorage.getItem('thematic_user_id');
export const getProjectId = () => localStorage.getItem('thematic_project_id');

export default thematicClient;