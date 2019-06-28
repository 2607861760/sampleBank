<style lang="scss" scoped>
.page-contant{
    padding:20px;
    .page-title{
        font-size: 18px;
        font-weight: bold;
    }
    .page-inner{
        margin-top:20px;
        display: flex;
        .page-template{
            flex:1;
            font-size: 18px;
            .page-template-title{
                height:50px;
                line-height: 50px;
            }
            .page-template-tree{
                height: 650px;
                margin-top:10px;
                overflow-y: scroll;
                padding:10px;
                border: 1px solid #f2f2f2;
            }
        }
        .page-template-detail{
            flex:2;
            .page-template-detail-handle{
                width: 100%;
                height:50px;
                line-height: 50px;
            }
            .page-template-detail-table{
                margin-top: 10px;
            }
        }
        &>div{
            float: left;
        }
        &>div+div{
            margin-left: 30px;
        }
    }
}
</style>

<template>
    <div class="page-contant">
        <div class="page-title">表单模板管理</div>
        <div class="page-inner">
            <div class="page-template">
                <div class="page-template-title">
                    <span>表单模板</span>
                    <el-button type="primary" size="medium" style="float:right;margin-top:7px;" @click="addTemplate">添加表单模板</el-button>
                </div>
                <div class="page-template-tree">
                    <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </div>
            </div>
            <div class="page-template-detail">
                <div class="page-template-detail-handle">
                    <div style="float:left;">111</div>
                    <div style="float:right;font-size:18px;font-weight:bold;">
                        <el-button type="primary" size='medium' @click="correlationVisible=true">关联</el-button>
                        <el-button type="primary" size='medium'>导入</el-button>
                        <el-button type="primary" size='medium'>预览</el-button>
                    </div>
                    
                </div>
                <div class="page-template-detail-table">
                    <el-table :data='tableData' border max-height='475'>
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column type="index" label="序号"></el-table-column>
                        <el-table-column prop="NAME" label="指标名称"></el-table-column>
                        <el-table-column prop="CONTROL_TYPE" label="数据类型"></el-table-column>
                        <el-table-column prop="CONTROL_TYPE" label="排序"></el-table-column>
                        <el-table-column prop="CONTROL_TYPE" label="是否作为搜索条件"></el-table-column>
                        <el-table-column prop="CONTROL_TYPE" label="是否显示"></el-table-column>
                        <el-table-column prop="CONTROL_TYPE" label="是否为关键指标"></el-table-column>
                        <el-table-column prop="CONTROL_TYPE" label="是否为必填项"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button type="primary" plain size="medium" @click="filedShow(scope.row)">修改</el-button>
                                <el-button type="primary" plain size="medium" @click="filedRemove(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="margin-top:5px;float:right;">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            :page-sizes="[100, 200, 300, 400]"
                            :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="400">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>

        <!-- 添加表单模板 -->
        <el-dialog title="添加表单模板" :visible.sync="templateVisible" width='600px'>
            <el-form :model="templateForm" label-width="80px">
                <el-col :span='24'>
                    <el-form-item label="名称">
                        <el-input v-model="templateForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="行数">
                        <el-input v-model="templateForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="列数">
                        <el-input v-model="templateForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="行间距">
                        <el-input v-model="templateForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="列间距">
                        <el-input v-model="templateForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="页面宽">
                        <el-input v-model="templateForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="页面高">
                        <el-input v-model="templateForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="X">
                        <el-input v-model="templateForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='12'>
                    <el-form-item label="Y">
                        <el-input v-model="templateForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='24'>
                    <el-form-item label="显示方式">
                        <el-radio-group v-model="radio">
                            <el-radio :label="1">弹出</el-radio>
                            <el-radio :label="2">非弹出</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span='24'>
                    <el-form-item label="备注">
                        <el-input type="textarea" :rows="2" v-model="templateForm.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="primaryVisible = false">取 消</el-button>
                <el-button type="primary" @click="primaryConfirm">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 关联 -->
        <el-dialog title="添加关联指标" :visible.sync="correlationVisible" width='600px'>
            <div>
                <el-select>
                    <el-option v-for='item in relationList' :key='item.id' :value="item.id" :label='item.name'></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus" size='medium'></el-button>
            </div>
            <div style="margin-top:10px;">
                <el-table :data='relationData' border max-height="400">
                    <el-table-column label="关系">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.relation">
                                <el-option value='1' label='并'></el-option>
                                <el-option value='2' label='或'></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="指标">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.target">
                                <el-option v-for='item in targetList' :key='item.id' :value="item.id" :label='item.name'></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="条件">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.value">
                                <el-option v-for='item in valueList' :key='item.id' :value="item.id" :label='item.name'></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="primaryVisible = false">取 消</el-button>
                <el-button type="primary" @click="primaryConfirm">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 导入 -->
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            templateVisible:false,
            templateForm:{},
            correlationVisible:false,
            relationList:[],
            relationData:[],
            targetList:[],
            valueList:[],
            treeData: [{
                label: '一级 1',
                id:1,
                children: [{
                    label: '二级 1-1',
                    id:11,
                    children: [{
                    label: '三级 1-1-1',
                    id:111,
                    }]
                }]
                }, {
                label: '一级 2',
                id:2,
                children: [{
                    label: '二级 2-1',
                    id:21,
                    children: [{
                    label: '三级 2-1-1',
                    id:211,
                    }]
                }, {
                    label: '二级 2-2',
                    id:22,
                    children: [{
                    label: '三级 2-2-1',
                    id:221,
                    }]
                }]
                }, {
                label: '一级 3',
                id:3,
                children: [{
                    label: '二级 3-1',
                    id:31,
                    children: [{
                    label: '三级 3-1-1',
                    id:311,
                    }]
                }, {
                    label: '二级 3-2',
                    id:32,
                    children: [{
                    label: '三级 3-2-1',
                    id:321,
                    }]
                }]
            }],
        }
    },
    methods:{
        addTemplate(){
            this.templateVisible=true;
        }
    }
}
</script>

