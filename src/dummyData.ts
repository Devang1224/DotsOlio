import type { SearchData } from "./types";

import user2 from './assets/images/user2.jpg';
import user1 from './assets/images/user3.jpeg'


export const searchData:SearchData[] = [
  {
    id:5,
    image:user2,
    name:"Sophia Martinez",
    status:'Active 2d ago',
    type:'people',
},
{
    id:6,
    image:user1,
    name:"Liam Johnson",
    status:'Unactivated',
    type:'people',
},
{
    id:7,
    name:"project_notes.pdf",
    type:"file",
    fileType:'document',
    location:"Documents",
    status:"Edited 2d ago",
},
{
    id:8,
    name:"team_meeting.mp4",
    type:"file",
    fileType:"video",
    location:"Meetings",
    status:"Added 3d ago",
},
{
    id:9,
    image:user2,
    name:"Emily Carter",
    status:'Active 5h ago',
    type:'people',
},
{
    id:10,
    name:"wireframe_design.png",
    type:"file",
    fileType:'image',
    location:"Designs",
    status:"Edited 4d ago",
},
{
    id:11,
    name:"company_overview.mov",
    type:"file",
    fileType:"video",
    location:"Corporate",
    status:"Added 1w ago",
},
{
    id:12,
    image:user1,
    name:"Daniel Brown",
    status:'Active just now',
    type:'people',
},
{
    id:13,
    name:"logo_variations.svg",
    type:"file",
    fileType:"image",
    location:"Branding",
    status:"Edited 2w ago",
},
{
    id:14,
    name:"training_session.mp4",
    type:"file",
    fileType:"video",
    location:"HR",
    status:"Added 5d ago",
},
{
    id:15,
    name:"Dribble Folder",
    type:"folder",
    location:"Projects",
    status:"Edited 2m ago",

}

]

