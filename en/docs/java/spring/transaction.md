# Transaction

A transaction is a logical unit of work that consists of one or more operations on a database, such as reading, writing, updating, or deleting data. Transactions are important for ensuring the consistency and integrity of the data in a database, especially when multiple users or applications access the data concurrently.

A transaction has four main properties, known as ACID:

- **Atomicity**: A transaction is either completed in its entirety or not at all. If any part of the transaction fails, the entire transaction is aborted and any changes made by the transaction are rolled back.
- **Consistency**: A transaction transforms the database from one consistent state to another consistent state. A consistent state is one that satisfies all the integrity constraints and business rules defined for the database.
- **Isolation**: A transaction is isolated from other concurrent transactions, meaning that its intermediate results and effects are not visible to others until the transaction is committed. This prevents interference and anomalies among concurrent transactions.
- **Durability**: Once a transaction is committed, its effects are permanent and will not be lost even in the event of a system failure or power outage.

Without transactions, the data in the database may become inconsistent, inaccurate, or corrupted due to failures or concurrency issues. Therefore, transactions are essential for maintaining the reliability and correctness of the data in a database.

However, transactions are not without challenges or trade-offs. Transactions may affect the performance, scalability, or availability of the database system, depending on how they are implemented and managed. For example,

- Transactions may incur some overhead for creating, committing, rolling back, or coordinating transactions, such as logging, locking, or messaging.
- Transactions may reduce the concurrency or throughput of the database system, as they may block or delay other operations that access the same data or resources.
- Transactions may increase the complexity or difficulty of the database system, as they may introduce new problems or challenges, such as deadlocks, livelocks, starvation, or distributed consensus.

Therefore, transactions require careful design and optimization to balance the trade-offs between data consistency and system performance.

## Core Concepts

There are some core concepts that are essential for understanding how transactions work and how to manage them effectively.

### Transaction Boundaries

A transaction boundary defines the scope and duration of a transaction. It marks the beginning and the end of a transaction, as well as the points where the transaction can be committed or rolled back. Transaction boundaries can be explicit or implicit, depending on how they are defined and controlled by the application or the database system.

The following table shows some examples of how transaction boundaries can be defined and controlled by different methods:

#### Explicit

The application explicitly starts and ends a transaction using SQL statements or commands. For example:

```sql
START TRANSACTION;
UPDATE account SET balance = balance - 200 WHERE id = 1;
UPDATE account SET balance = balance + 200 WHERE id = 2;
COMMIT;
```

#### Implicit

The database system implicitly starts and ends a transaction for each SQL statement or command. For example:

```sql
UPDATE account SET balance = balance - 200 WHERE id = 1;
UPDATE account SET balance = balance + 200 WHERE id = 2;
```

#### Auto-commit

The database system automatically commits each SQL statement or command as a single transaction. For example:

```sql
SET AUTOCOMMIT = ON;
UPDATE account SET balance = balance - 200 WHERE id = 1;
UPDATE account SET balance = balance + 200 WHERE id = 2;
```

#### Batch

The application executes a batch of SQL statements or commands as a single transaction. For example:

```sql
BEGIN BATCH;
UPDATE account SET balance = balance - 200 WHERE id = 1;
UPDATE account SET balance = balance + 200 WHERE id = 2;
APPLY BATCH;
```

### Transaction States

A transaction state is the current status or condition of a transaction during its execution. A transaction can have one of the following states:

- **Active**: This is the initial state of a transaction when it starts. In this state, the transaction is executing its operations on the database. If all the operations are executed successfully, the transaction moves to the partially committed state. If any operation fails or encounters an error, the transaction moves to the failed state.
- **Partially Committed**: This is the state of a transaction when it has executed its final operation but not yet committed. In this state, the transaction has made some changes to the database but they are not permanent yet. If the commit operation succeeds, the transaction moves to the committed state. If the commit operation fails or encounters an error, the transaction moves to the failed state.
- **Committed**: This is the state of a transaction when it has completed successfully and made its changes permanent on the database. In this state, the transaction has achieved its goal and satisfied the ACID properties. The transaction moves to the terminated state after releasing all the resources it acquired during its execution.
- **Failed**: This is the state of a transaction when it has encountered an error or failure during its execution. In this state, the transaction has made some changes to the database but they are not consistent or valid. The transaction moves to the aborted state after undoing all the changes it made to restore the database to its previous consistent state.
- **Aborted**: This is the state of a transaction when it has been rolled back and discarded. In this state, the transaction has failed and cancelled its effects on the database. The transaction may move to the active state again if it is restarted or retried after resolving the cause of failure.
- **Terminated**: This is the final state of a transaction when it has ended its execution. In this state, the transaction has either committed or aborted and released all the resources it acquired during its execution. The transaction is no longer active and cannot be restarted or retried.

### Transaction Control

Transaction control refers to the mechanisms and commands that are used to manage transactions, such as starting, committing, rolling back, or terminating transactions. Transaction control can be performed by the application or by the database system, depending on the level of abstraction and automation required.

### Transaction Propagation

Transaction propagation refers to the way transactions are propagated or transferred across different components or resources that participate in a transaction. For example, if an application calls a method that starts a new transaction, then the transaction may be propagated to other methods that are invoked by the same application or by other applications. Transaction propagation can affect the performance and consistency of transactions, depending on how they are coordinated and synchronized.

In Spring, the `propagation` attribute of `@Transactional` has seven possible values. Each value has a different meaning and implication for transaction management.

- **REQUIRED** means that if there is an existing transaction, then join it; otherwise create a new one. This is useful for typical read-write operations where atomicity is required.
- **REQUIRES_NEW** means that always start a new transaction, even if one already exists. Suspends the existing transaction until the new one is complete. This is useful when you want to ensure that a specific operation is always executed in a new transaction.
- **SUPPORTS** means that participate in a transaction if one already exists; doesn’t start a new transaction if one doesn’t exist. This is useful for read-only operations that can be part of a transaction but don’t necessarily need to be.
- **MANDATORY** means that require that a transaction already exists; if a transaction doesn’t exist, an exception is thrown. This is useful when you want to enforce that a method must be called within an existing transaction.
- **NOT_SUPPORTED** means that specify that a method should not participate in a transaction at all; suspends any existing transaction. This is useful for non-transactional operations within a transactional context.
- **NEVER** means that specify that a method should never be called within a transaction; if a transaction is active, an exception is thrown. This is useful when you want to enforce that a method must not be called within a transaction.
- **NESTED** means that start a nested transaction if one already exists; behaves like REQUIRED otherwise. This is useful when you want to have finer-grained control over the transaction boundaries and rollback points.

### Transaction Isolation

Transaction isolation refers to the degree of isolation or separation that is maintained among concurrent transactions. It determines how much data visibility and concurrency control are provided by the database system to prevent conflicts and anomalies among transactions. There are four standard levels of transaction isolation: read uncommitted, read committed, repeatable read, and serializable. Each level has different trade-offs between data consistency and concurrency performance.

In Spring, the `isolation` attribute of `@Transactional` has five possible values. Each value corresponds to a standard level of transaction isolation defined by the SQL standard. Each level has a different meaning and implication for data consistency and concurrency performance.

- **DEFAULT** means that use the default isolation level of the underlying database. This is useful when you want to use the native behavior of the database system for transactions.
- **READ_UNCOMMITTED** means that allow a transaction to read data that has not yet been committed by other transactions, thereby allowing dirty reads. This is the lowest level of isolation and provides the highest concurrency but the lowest consistency.
- **READ_COMMITTED** means that guarantee that any data read by a transaction has been committed by other transactions at the moment it is read, thereby preventing dirty reads. This is a common level of isolation and provides a reasonable balance between concurrency and consistency.
- **REPEATABLE_READ** means that guarantee that any data read by a transaction will not be changed by other transactions until the transaction is complete, thereby preventing non-repeatable reads. This is a higher level of isolation and provides better consistency but lower concurrency.
- **SERIALIZABLE** means that guarantee that any data read or written by a transaction will be consistent with a serial execution of all transactions, thereby preventing dirty reads, non-repeatable reads, and phantom reads. This is the highest level of isolation and provides the best consistency but the worst concurrency.

## Transactions in Databases

Different databases may have different ways of implementing and supporting transactions, depending on their architecture, features, and standards. However, some common aspects and principles apply to most databases. In this section, we will use MySQL and Oracle as examples to illustrate how transactions work in databases.

### Transactions in MySQL

[MySQL](../../dev/db/mysql/index.md) supports transactions for tables that use storage engines that support transactions, such as InnoDB. By default, MySQL runs with autocommit mode enabled, which means that every SQL statement is treated as a single transaction and is automatically committed right after execution.

To disable autocommit mode and start a new transaction explicitly, you can use the `START TRANSACTION` statement.

Alternatively, you can use `BEGIN` or `BEGIN WORK` as aliases for `START TRANSACTION`.

To commit the current transaction and make its changes permanent, you can use the `COMMIT` statement.

To roll back the current transaction and cancel its changes, you can use the `ROLLBACK` statement.

To set the transaction isolation level for the current session, you can use the `SET TRANSACTION ISOLATION LEVEL` statement.

MySQL supports four levels of transaction isolation: read uncommitted, read committed, repeatable read (the default), and serializable.

### Transactions in Oracle

[Oracle](../../dev/db/oracle/index.md) supports transactions for all tables regardless of their storage type. By default, Oracle runs with autocommit mode disabled, which means that every SQL statement is not automatically committed unless explicitly specified.

To start a new transaction, you do not need to use any special statement, as Oracle implicitly starts a transaction when you execute the first SQL statement.

To commit the current transaction and make its changes permanent, you can use the `COMMIT` statement:

To roll back the current transaction and cancel its changes, you can use the `ROLLBACK` statement:

To set the transaction isolation level for the current session, you can use the `SET TRANSACTION ISOLATION LEVEL` statement:

Oracle supports two levels of transaction isolation: read committed (the default) and serializable.

## Spring Transaction

[Spring](./index.md) provides support for managing transactions in a declarative and consistent way. Spring transaction management is based on the abstraction of the `PlatformTransactionManager` interface, which defines the methods for creating, committing, rolling back, and suspending transactions.

Spring provides various implementations of the `PlatformTransactionManager` interface for different types of resources, such as JDBC, JPA, Hibernate, JMS, and JTA. Spring also provides a unified annotation-based programming model for transaction management, which is based on the `@Transactional` annotation.

The `@Transactional` annotation can be applied to classes or methods to indicate that they should be executed within a transaction. The annotation supports various attributes to configure the transaction behavior, such as propagation, isolation, timeout, read-only, and rollback rules.

For example, to apply the `@Transactional` annotation to a service class that uses JPA as the persistence technology, we can write something like this:

```java
@Service
@Transactional
public class FooService {

    @Autowired
    private FooRepository fooRepository;

    public void saveFoo(Foo foo) {
        fooRepository.save(foo);
    }

    public Foo findFooById(Long id) {
        return fooRepository.findById(id).orElse(null);
    }

}
```

In this example, we have annotated the `FooService` class with `@Transactional`, which means that all public methods of this class will be executed within a transaction. We have also injected a `FooRepository` bean, which is a Spring Data JPA interface that extends the `JpaRepository` interface. The `JpaRepository` interface provides methods for performing CRUD operations on entities using JPA.

By default, Spring will use the `JpaTransactionManager` as the transaction manager for JPA transactions. The default transaction attributes are:

- Propagation: `REQUIRED`, which means that if there is an existing transaction, then join it; otherwise create a new one.
- Isolation: `DEFAULT`, which means that use the default isolation level of the underlying database.
- Timeout: `-1` (no timeout), which means that use the default timeout of the underlying transaction system.
- Read-only: `false`, which means that allow modifications to the data.
- Rollback: for runtime exceptions only, which means that only roll back the transaction if an unchecked exception is thrown.

We can override these default attributes by specifying them in the `@Transactional` annotation. For example, to make a method read-only and roll back for any exception, we can write something like this:

```java
@Transactional(readOnly = true, rollbackFor = Exception.class)
public Foo findFooById(Long id) {
    return fooRepository.findById(id).orElse(null);
}
```

> `@Transactional` does not work for the internal call because Spring uses proxies to implement transaction management.

## FAQ

### UnexpectedRollbackException

The message of the exception is _Transaction rolled back because it has been marked as rollback-only_. One of the possible reason is that if the propagation of the nested transaction is set to default, the inner and outer transactions are actually one transaction. When the inner transaction throws an exception, Spring marks the current transaction as _rollback-only_. If the outer transaction catches the exception and doesn't throw it and commits the transaction normally, the exception will occur.

There are several ways to solve the exception:

- If the application is expected to interrupt when the inner transaction throws an exception, don't catch the exception in the outer transaction and throw it directly.
- If the application is expected to execute normally, catch and handle the exception in the inner transaction.
- If the inner transaction is expected to rollback and have no effect on the outer one, set the propagation of the inner transaction to `NESTED` instead of `REQUIRED`.

## References

- [MySQL Transactional and Locking Statements](https://dev.mysql.com/doc/refman/8.0/en/sql-transactional-statements.html)
- [Oracle Transaction Management](https://docs.oracle.com/en/database/oracle/oracle-database/21/cncpt/oracle-transaction-management.html#GUID-3144CE4E-8120-49D9-9BDF-BE9C011E5662)
- [Spring Transaction Management](https://docs.spring.io/spring-framework/docs/current/reference/html/data-access.html#transaction)
- [Transaction Propagation and Isolation in Spring @Transactional](https://www.baeldung.com/spring-transactional-propagation-isolation)
