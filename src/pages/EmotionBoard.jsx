import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import Table from 'react-bootstrap/Table';

const Columnsnames =  ["EmotionID", "Subtypes", "OverallType"];

function DisplayEmotions(year) {

    const mockup = [{
        EmotionID: 1,
        SubType: "mock1",
        OverallType: "Angry"
    }, {
        EmotionID: 2,
        SubType: "mock2",
        OverallType: "Happy"
    }];

    return (
        <>
        <Table striped bordered borderColor="white" hover size='xxl' style={{justifySelf: 'center'}}>
        <thead>
          <tr>
            {Columnnames.map((colname) => (
              <th key = {colname}> {colname} </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockup.map((queryresult) => (
            <tr>
              {Columnnames.map((colname) => (
              <th key = {colname}> {queryresult[colname]} </th>
            ))}
            </tr>
          ))}
        </tbody>
      </Table>
      </>
    )
}
