/**
 * Data Service for Portfolio Content
 * Loads isolated JSON fixtures with async handling and error fallbacks.
 */

import profileData from '../fixtures/profile.json';
import projectsData from '../fixtures/projects.json';
import skillsData from '../fixtures/skills.json';
import verificationData from '../fixtures/verification.json';

/**
 * Simulates a realistic network latency for showcasing clean loading skeletons
 * @param {number} ms 
 * @returns {Promise<void>}
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const dataService = {
  /**
   * Retrieves profile information
   * @returns {Promise<object>}
   */
  async getProfile() {
    return profileData;
  },

  /**
   * Retrieves projects list with simulated delay for loading skeleton demonstration
   * @param {string} [category='all'] 
   * @param {number} [simulatedLatency=400]
   * @returns {Promise<Array<object>>}
   */
  async getProjects(category = 'all', simulatedLatency = 350) {
    if (simulatedLatency > 0) {
      await delay(simulatedLatency);
    }

    if (!category || category === 'all') {
      return [...projectsData];
    }

    return projectsData.filter((project) => project.category === category);
  },

  /**
   * Retrieves a single project by id
   * @param {string} id 
   * @returns {Promise<object|null>}
   */
  async getProjectById(id) {
    const project = projectsData.find((p) => p.id === id);
    return project ? { ...project } : null;
  },

  /**
   * Retrieves technical skills categorized
   * @returns {Promise<Array<object>>}
   */
  async getSkills() {
    return [...skillsData];
  },

  /**
   * Retrieves external client verification reports and testimonials
   * @returns {Promise<object>}
   */
  async getVerificationData() {
    return { ...verificationData };
  }
};
