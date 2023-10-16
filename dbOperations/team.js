import teamSchema from "../models/teamSchema.js"
import PlayerSchema from "../models/playerSchema.js"

// import { updateTeam } from "./playerOprerations.js";
const updateTeamMankingInPlayer = async (userId, teamId) => {
    return new Promise(async (resolve, reject) => {
        await PlayerSchema.findOneAndUpdate({ _id: userId }, {
            $set: {
                team: teamId
            }
        }).then(data => {
            if (data){
                resolve(data)

            }else reject(userId)
        }).catch(err => reject(err))

    })
}

export const CreateNewTeam = ({ name, joinId, _id }) => {
    return new Promise((resolve, reject) => {
        new teamSchema({
            name: name,
            joinId: joinId,
            admin: _id,
            members: [
                {
                    user: _id,
                    access: 1
                }
            ]
        }).save()
            .then((data) => {
                updateTeamMankingInPlayer(_id,{id: data._id,status:true})
                    .then(() => {
                        resolve(data)
                    }).catch((err) => {
                        reject(err)
                    })

            }).catch((err) => {
                reject(err)
            })
    })
}
export const getTeamDatas = (id) => {
    return new Promise((resolve, reject) => {
        teamSchema.findOne({ _id: id })
            .populate("members.user","_id name email")
            .then((res) =>{
                resolve(res)
            } )
            .catch((err) =>{
                reject(err);
            })
    })
}


export const joinTeamWithJoinId = async (_id, join_id) => {
    try {
        const teamData = await teamSchema.findOneAndUpdate({
            joinId: join_id
        }, {
            $push: {
                members: { user: _id }
            }
        });
        const result = await updateTeamMankingInPlayer(_id,{id: teamData._id,status:true});

        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
export const exitTeamWithTeamId = async (_id, teamId) => {
    try {
        const teamData = await teamSchema.findOneAndUpdate({
            _id: teamId
        }, {
            $pull: {
                members: { user: _id }
            }
        }).populate("members.user")
        const result = await updateTeamMankingInPlayer(_id, {id:"0000" ,status:false});
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
}