import { NextFunction, Request, Response } from "express"
import { getRepository } from "typeorm"
import { CreateGroupInput, UpdateGroupInput } from "../interface/group.interface"
import { Group } from "../entity/group.entity"
import { GroupStudent } from "../entity/group-student.entity";

export class GroupController {

  private groupRespository = getRepository(Group);
  private groupStudentRepository = getRepository(GroupStudent)

  async allGroups(request: Request, response: Response, next: NextFunction) {
    // Task 1: 
    
    // Return the list of all groups
    return this.groupRespository.find()

  }

  async createGroup(request: Request, response: Response, next: NextFunction) {
    // Task 1: 
    
    // Add a Group
    const { body: params } = request;
    console.log('params from createGroup - ', params);

    const createGroupInput: CreateGroupInput = {
      name: params?.name,
      number_of_weeks: params?.number_of_weeks,
      roll_states: params?.roll_states,
      incidents: params?.incidents,
      ltmt: params?.ltmt
    };
    console.log('input for createGroup - ', createGroupInput);

    const group = new Group();

    group.prepareToCreate(createGroupInput);

    return this.groupRespository.save(group);
  };

  async updateGroup(request: Request, response: Response, next: NextFunction) {
    // Task 1: 
    
    // Update a Group
    const { body: params } = request;
    console.log('params from updateGroup - ', params);

    this.groupRespository.findOne(params?.id).then((group) => {

      const updateGroupInput: UpdateGroupInput = {
        id: params?.id,
        name: params?.name,
        number_of_weeks: params?.number_of_weeks,
        roll_states: params?.roll_states,
        incidents: params?.incidents,
        ltmt: params?.ltmt
      };

      group.prepareToUpdate(updateGroupInput);

      return this.groupRespository.save(group);

    });
  };

  async removeGroup(request: Request, response: Response, next: NextFunction) {
    // Task 1: 
    
    // Delete a Group
    let idToRemove = request?.params?.id;
    let groupToRemove = await this.groupRespository.findOne(idToRemove);

    await this.groupRespository.remove(groupToRemove);
  }

  async getGroupStudents(request: Request, response: Response, next: NextFunction) {
    // Task 1: 
        
    // Return the list of Students that are in a Group

    const { body: params } = request;

    let groupRepoResult = await this.groupRespository.findOne(params?.id)
    console.log('groupRepoResult - ',groupRepoResult?.name)

    let studentGroupResult = await this.groupStudentRepository.findOne(params?.id)
    console.log('studentGroupResult - ',studentGroupResult)

    // let getGroupObject = {
    //   id: groupRepoResult?.id,
    //   first_name: params?.first_name,
    //   last_name: params?.last_name,
    //   full_name: `${params?.first_name} ${ params?.last_name}`
    // }

    return groupRepoResult;
  }


  async runGroupFilters(request: Request, response: Response, next: NextFunction) {
    // Task 2:
  
    // 1. Clear out the groups (delete all the students from the groups)

    // 2. For each group, query the student rolls to see which students match the filter for the group

    // 3. Add the list of students that match the filter to the group
  }
}
