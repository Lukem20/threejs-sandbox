import { AxesHelper, GridHelper } from 'three';

function createAxesHelper() {
  const helper = new AxesHelper(3);
  return helper;
}

function createGridHelper() {
  const helper = new GridHelper(25);
  return helper;
}

export { createAxesHelper, createGridHelper };
