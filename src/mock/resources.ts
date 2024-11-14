import { Resources } from "../enums/resources";

export interface Resource {
    resourceType: Resources;
    value: number;
}


export let usersResources: Resource[] = [
    {resourceType: Resources.experience, value: 100},
    {resourceType: Resources.stone, value: 17},
    {resourceType: Resources.kitsu, value: 200},
    
]
