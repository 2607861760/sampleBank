<style lang="scss" scoped>
    .form-info{
        padding:20px;
    }
    .form-col{
        height: 50px;
        line-height: 50px;
        margin-bottom: 15px;
        .el-form-item__label,.el-form-item__content{
        line-height: 50px !important;
    }
    }
    .form-title{
        background: #f5f5f5;
        padding-left: 15px;
        font-size: 18px;
        border: 1px solid #e3e3e3;
    }
    
</style>
<template>
    <div class="form-info">
        <el-form :model="formData" :label-width="labelWidth" inline>
            <template v-for='(item,index) in formTemplate'>
                <div v-if="item.type==1" class="form-title form-col">{{item.label}}</div>
                <el-col :span="24/colSpan" v-else class="form-col">
                    <el-form-item :label="item.label">
                        <el-input 
                            type="text" 
                            v-if="item.type==2"
                            v-model="formData[item.id]"
                        ></el-input>
                        <el-input 
                            type="textarea" 
                            v-if="item.type==3"
                            v-model="formData[item.id]"
                        ></el-input>
                        <el-input-number 
                            v-if="item.type==4"
                            v-model="formData[item.id]"
                        ></el-input-number>
                        <el-input-number 
                            v-if="item.type==5"
                            v-model="formData[item.id]"
                        ></el-input-number>
                        <el-switch
                            v-if="item.type==6"
                            active-text="按月付费"
                            inactive-text="按年付费"
                            v-model="formData[item.id]"
                        >
                        </el-switch>
                        <el-radio-group 
                            v-if="item.type==7"
                            v-model="formData[item.id]"
                        >
                            <el-radio :label="3">备选项</el-radio>
                            <el-radio :label="6">备选项</el-radio>
                            <el-radio :label="9">备选项</el-radio>
                        </el-radio-group>
                        <el-checkbox-group 
                            v-if="item.type==8"
                            v-model="formData[item.id]"
                        >
                            <el-checkbox label="复选框 A"></el-checkbox>
                            <el-checkbox label="复选框 B"></el-checkbox>
                            <el-checkbox label="复选框 C"></el-checkbox>
                            <el-checkbox label="禁用" disabled></el-checkbox>
                            <el-checkbox label="选中且禁用" disabled></el-checkbox>
                        </el-checkbox-group>
                        <el-select 
                            v-model="formData[item.id]" 
                            placeholder="请选择"
                            v-if="item.type==9"
                        >
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-date-picker
                            v-if="item.type==11"
                            v-model="formData[item.id]"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </template>
        </el-form>
        <div>
            <el-button>按钮</el-button>
        </div>
    </div>
</template>
<script>
import {formTemp} from 'base/dataTemp.js'
export default {
    data(){
        return{
            formData:{},
            formTemplate:[],
            colSpan:3,
            labelWidth:'150px'
        }
    },

    created(){
        this.formTemplate=formTemp;
    }
}
</script>