/**
 * Data Service for Portfolio Content
 * Loads isolated JSON fixtures with predictable local handling and error fallbacks.
 */

import { getActiveContent, loadPortfolioContent } from '../i18n.js';

/**
 * Simulates a realistic network latency for showcasing clean loading skeletons
 * @param {number} ms
 * @returns {Promise<void>}
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const dataService = {
  load(language) {
    return loadPortfolioContent(language);
  },

  /**
   * Retrieves profile information
   * @returns {Promise<object>}
   */
  async getProfile() {
    return getActiveContent().profile;
  },

  /**
   * Retrieves projects list with simulated delay for loading skeleton demonstration
   * @param {string} [category='all']
   * @param {number} [simulatedLatency=0]
   * @returns {Promise<Array<object>>}
   */
  async getProjects(category = 'all', simulatedLatency = 0) {
    if (simulatedLatency > 0) {
      await delay(simulatedLatency);
    }

    if (!category || category === 'all') {
      return [...getActiveContent().projects];
    }

    return getActiveContent().projects.filter((project) => project.category === category);
  },

  /**
   * Retrieves a single project by id
   * @param {string} id
   * @returns {Promise<object|null>}
   */
  async getCTAs(id) {
    const ctas = getActiveContent().ctas;
    return ctas ? { ...ctas } : null;
  },

  /**
   * Retrieves a single project by id
   * @param {string} id
   * @returns {Promise<object|null>}
   */
  async getProjectById(id) {
    const project = getActiveContent().projects.find((p) => p.id === id);
    return project ? { ...project } : null;
  },

  /**
   * Retrieves technical skills categorized
   * @returns {Promise<Array<object>>}
   */
  async getSkills() {
    return [...getActiveContent().skills];
  },

  /**
   * Retrieves external client verification reports and testimonials
   * @returns {Promise<object>}
   */
  async getVerificationData() {
    return { ...getActiveContent().verification };
  }
};
