import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {userActions} from "../../redux/user/userSlice";
import {useSelector} from "react-redux";
import {cn} from "@bem-react/classname";
import {getUserMarksSelector} from "../../redux/user/userSelectors";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {RadioButtonGroup} from "../common/RadioButton/RadioButtonGroup";
import {mapMarks, semesters, tableHead} from "./semesters";
import './Rating.scss'
import {Table} from "../common/Table/Table";

const ratingCn = cn('rating')
export const Rating = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState('overview');
  useEffect(() => {
    dispatch(userActions.getMarks())
  }, [dispatch])
  let marks = useSelector(getUserMarksSelector);
  let data = marks.semesters.map((el) => {
    if (el.averageMark > 0) return {name: "S " + el.number || 0, uv: el.averageMark || 0}
    return {name: "S " + el.number};
  })
  console.log((marks.semesters[0] && marks.semesters[0].marks))
const content = (mode === 'overview') ? (    <LineChart
  width={500}
  height={400}
  data={data}
  margin={{
    top: 5, right: 30, left: 20, bottom: 5,
  }}
>
  <Line dataKey="uv" stroke="#8884d8"/>
  <XAxis domain={[1, 8]} dataKey="name"/>
  <YAxis interval={'preserveStart'} domain={[0, 11]} tickCount={12}/>
  <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
  <Tooltip/>
  <Legend/>
</LineChart>) : (
  <>
    <div> Average mark: {marks.semesters[mode -1].averageMark}</div>
  <Table data={marks.semesters[mode -1].marks.map(m => mapMarks(m))} head={tableHead}/>
  </>)

  return (<div className={ratingCn('container')}>
    <div><RadioButtonGroup check={setMode} checked={mode} name={"ratingOptions"} items={semesters}/>
    </div>
    {content}
  </div>)
}