import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get() 
    getUsers(@Query('role') role: "ADMIN" | "USER") {
        return {
            role,
            user: []
        }
    }

    @Get(':id')
    getUser(@Param('id') id: string) {
        return {
            id
        }
    }

    @Post()
    create(@Body() user: {}) {
        return user
    }

    @Patch(':id')
    updateUser(@Param('id') id: string, @Body() userUpdate: {}) {
        console.log(id)
        return {id, ...userUpdate}
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return {id}
    }
}
