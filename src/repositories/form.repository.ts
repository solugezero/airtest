import HttpRepository from '.';
class FormRepository extends HttpRepository {
    private path = `v1/form/`;

    async send(variables: { dto: object; formname: string }): Promise<any> {
        // any - т.к. зависит от того куда отправляем
        const response = await this.post<any>( // any - т.к. зависит от того куда отправляем
            `${this.path}/send`,
            variables
        );
        return response;
    }
}

export default FormRepository;
